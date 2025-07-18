// src/lib/firestore.ts - DEFINITIVE WORKING VERSION
import { doc, setDoc, serverTimestamp, collection, addDoc, getDoc, updateDoc, runTransaction, arrayUnion, arrayRemove, increment, Timestamp, query, where, getCountFromServer, orderBy, limit, startAfter, getDocs, DocumentSnapshot } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";
import { classifyPost } from "@/ai/flows/classify-post-flow";
import { CulturalIntelligenceService } from "@/services/cultural-intelligence";

// ORIGINAL WORKING USER PROFILE (unchanged)
export type UserProfileData = {
    uid: string;
    email: string | null;
    displayName: string;
    photoURL: string;
    createdAt: any;
    updatedAt?: any;
    termsAccepted: boolean;
    birthday?: string;
    location?: string;
    church?: string;
    quote?: string;
    favoriteScripture?: string;
    region?: string;
};

// ORIGINAL WORKING JOURNAL ENTRY (unchanged)
export type JournalEntryData = {
    userId: string;
    title: string;
    content: string;
    type: string;
    isPublic: boolean;
    tags: string[];
    timestamp: any;
};

// SPIRITUAL TYPES (new but optional)
export type SpiritualReaction = 'praying' | 'believing' | 'encouraging' | 'inspired';
export type TestimonyCategory = 'breakthrough' | 'healing' | 'provision' | 'restoration' | 'calling' | 'growth';

// FIXED POST TYPE (with proper timestamp handling)
export type Post = {
    id: string;
    userId: string;
    content: string;
    user: { 
        name: string; 
        avatar: string; 
        aiHint: string; 
    };
    timestamp: Timestamp | any; // Allow both Timestamp and serverTimestamp placeholder
    likes: number;
    likedBy: string[];
    comments: number;
    imageUrl?: string;
    aiHint?: string;
    
    // NEW: Optional spiritual features (won't break existing data)
    type?: 'testimony' | 'prayer_request' | 'text' | 'question';
    category?: TestimonyCategory;
    reactions?: {
        praying: number;
        believing: number;
        encouraging: number;
        inspired: number;
    };
    userReaction?: { [key: string]: SpiritualReaction }; // Changed to handle multiple users
    prayCount?: number;

    // Phase 1D: Silent cultural intelligence
    metadata?: {
        [key: string]: any;
    };
};

// SAFE PRAYER REQUEST (unchanged)
export type PrayerRequest = {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    aiHint: string;
    request: string;
    category: 'Personal' | 'Family' | 'Church' | 'Praise' | 'Answered' | 'Testimony' | 'Verdict';
    timestamp: Timestamp;
    prayCount: number;
    comments: { name: string; text: string; }[];
    type: 'request' | 'testimony' | 'verdict' | 'answered';
};

// ALL ORIGINAL FUNCTIONS (unchanged)
export const createUserProfile = async (user: User, additionalData: Record<string, any> = {}) => {
    if (!user || !db) return;

    const userRef = doc(db, `users/${user.uid}`);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        const userData: Partial<UserProfileData> = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || additionalData.displayName || user.email?.split('@')[0] || "User",
            photoURL: user.photoURL || `https://placehold.co/100x100.png`,
            termsAccepted: additionalData.termsAccepted || false,
            ...additionalData,
        };

        try {
            await setDoc(userRef, {
                ...userData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw new Error("Could not create user profile.");
        }
    }
};

export const getUserProfile = async (uid: string): Promise<Partial<UserProfileData> | null> => {
    if (!db) return null;
    const userRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() as Partial<UserProfileData> : null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfileData>) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }
    const userRef = doc(db, `users/${uid}`);

    const cleanProfileData: { [key: string]: any } = { ...data };
    
    delete cleanProfileData.uid;
    delete cleanProfileData.createdAt;
    delete cleanProfileData.email;
    if (cleanProfileData.photoURL === undefined) {
        delete cleanProfileData.photoURL;
    }

    cleanProfileData.updatedAt = serverTimestamp();

    try {
        await setDoc(userRef, cleanProfileData, { merge: true });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Could not update user profile.");
    }
};

export const updateUserProfilePhoto = async (uid: string, photoURL: string) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }
    const userRef = doc(db, `users/${uid}`);
    try {
        await updateDoc(userRef, {
            photoURL: photoURL,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating user photo:", error);
        throw new Error("Could not update user photo.");
    }
};

export const createJournalEntry = async (user: User, entryData: Omit<JournalEntryData, 'userId' | 'timestamp'>) => {
    if (!db || !user) {
        throw new Error("User must be logged in to create a journal entry.");
    }
    
    const newEntry = {
        title: entryData.title,
        content: entryData.content,
        type: entryData.type,
        isPublic: entryData.isPublic,
        tags: entryData.tags,
        userId: user.uid,
        timestamp: serverTimestamp(),
    };

    try {
        await addDoc(collection(db, "journalEntries"), newEntry);
    } catch (error) {
        console.error("Error creating journal entry:", error);
        throw new Error("Could not create journal entry.");
    }
};

export const updatePrayerCount = async (prayerId: string, incrementValue: 1 | -1) => {
    if (!db) {
        console.error("Firestore is not initialized.");
        return;
    }
    
    const shardsRef = collection(db, `prayerRequests/${prayerId}/counter_shards`);

    try {
        await addDoc(shardsRef, { _increment: incrementValue });
    } catch (error) {
        console.error("Error updating prayer count:", error);
    }
};

export const createPrayerRequest = async (user: User, request: string) => {
    if (!db || !user) {
        throw new Error("User must be logged in to create a prayer request.");
    }

    try {
        await addDoc(collection(db, "prayerRequests"), {
            userId: user.uid,
            name: user.displayName || "Anonymous",
            avatar: user.photoURL || "https://placehold.co/100x100.png",
            aiHint: "person portrait",
            request: request,
            timestamp: serverTimestamp(),
            prayCount: 0,
            comments: [],
            type: 'request',
            category: 'Personal'
        });
    } catch (error) {
        console.error("Error creating prayer request:", error);
        throw new Error("Could not create prayer request.");
    }
};

// ENHANCED CREATE POST WITH SPIRITUAL FEATURES (safe)
export const createSocialPost = async (user: User, content: string) => {
  if (!db || !user) {
    throw new Error("User must be logged in to create a post.");
  }

  try {
    const { category: aiCategory } = await classifyPost({ content });

    const userProfile = await getUserProfile(user.uid);
    const culturalMetadata = await CulturalIntelligenceService.collectCulturalMetadata(
      content,
      user,
      userProfile || undefined
    );

    const postData: Omit<Post, 'id'> = {
      userId: user.uid,
      user: {
        name: user.displayName || "Anonymous",
        avatar: user.photoURL || "https://placehold.co/100x100.png",
        aiHint: "person portrait",
      },
      content: content,
      timestamp: serverTimestamp(),
      likes: 0,
      likedBy: [],
      comments: 0,
      category: aiCategory,
      type: "testimony",
      reactions: {
        praying: 0,
        believing: 0,
        encouraging: 0,
        inspired: 0,
      },
      metadata: {
        ...culturalMetadata,
        userRegion: userProfile?.location || "unknown",
        timestamp: Timestamp.now(),
      },
    };

    await addDoc(collection(db, "posts"), postData);
  } catch (error) {
    console.error("Error in post creation:", error);
    throw error;
  }
};


export const toggleLikePost = async (postId: string, userId: string) => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const postRef = doc(db, "posts", postId);

    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Document does not exist!";
            }

            const postData = postDoc.data() as Post;
            const likedBy = postData.likedBy || [];
            const hasLiked = likedBy.includes(userId);

            if (hasLiked) {
                transaction.update(postRef, {
                    likes: increment(-1),
                    likedBy: arrayRemove(userId)
                });
            } else {
                transaction.update(postRef, {
                    likes: increment(1),
                    likedBy: arrayUnion(userId)
                });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw new Error("Could not update like status.");
    }
};

// NEW: SPIRITUAL REACTION SYSTEM (safe)
export const togglePostReaction = async (postId: string, userId: string, reactionType: SpiritualReaction) => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const postRef = doc(db, "posts", postId);

    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Document does not exist!";
            }

            const postData = postDoc.data() as Post;
            const currentReactions = postData.reactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 };
            const userReactions = postData.userReaction || {};
            const previousReaction = userReactions[userId];

            // Remove previous reaction if exists
            if (previousReaction) {
                currentReactions[previousReaction] = Math.max(0, currentReactions[previousReaction] - 1);
            }

            // Add new reaction if different from previous
            if (previousReaction !== reactionType) {
                currentReactions[reactionType] = (currentReactions[reactionType] || 0) + 1;
                userReactions[userId] = reactionType;
            } else {
                delete userReactions[userId];
            }

            transaction.update(postRef, {
                reactions: currentReactions,
                userReaction: userReactions
            });
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw new Error("Could not update reaction.");
    }
};

export const getUserStats = async (uid: string) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }

    const journalQuery = query(collection(db, "journalEntries"), where("userId", "==", uid));
    const prayerQuery = query(collection(db, "prayerRequests"), where("userId", "==", uid));
    const postQuery = query(collection(db, "posts"), where("userId", "==", uid));

    try {
        const [journalSnapshot, prayerSnapshot, postSnapshot] = await Promise.all([
            getCountFromServer(journalQuery),
            getCountFromServer(prayerQuery),
            getCountFromServer(postQuery)
        ]);

        return {
            journalEntries: journalSnapshot.data().count,
            prayerRequests: prayerSnapshot.data().count,
            posts: postSnapshot.data().count,
        };
    } catch (error) {
        console.error("Error getting user stats:", error);
        return {
            journalEntries: 0,
            prayerRequests: 0,
            posts: 0,
        };
    }
};

export const getSocialFeedPosts = async (postsLimit: number, lastVisible: DocumentSnapshot | null) => {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }

    let q;
    const postsCollection = collection(db, "posts");

    if (lastVisible) {
        q = query(postsCollection, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(postsLimit));
    } else {
        q = query(postsCollection, orderBy("timestamp", "desc"), limit(postsLimit));
    }

    const documentSnapshots = await getDocs(q);
    
    const posts = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Post));
    
    const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { posts, lastVisible: newLastVisible };
};

export const getPrayerRequests = async (reqsLimit: number, lastVisible: DocumentSnapshot | null, typeFilter?: PrayerRequest['type']) => {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }

    const reqsCollection = collection(db, "prayerRequests");
    let q;

    const constraints = [orderBy("timestamp", "desc"), limit(reqsLimit)];
    if (typeFilter) {
        constraints.unshift(where("type", "==", typeFilter));
    }
    if (lastVisible) {
        constraints.push(startAfter(lastVisible));
    }

    q = query(reqsCollection, ...constraints);
    
    const documentSnapshots = await getDocs(q);
    
    const requests = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as PrayerRequest));
    
    const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { requests, lastVisible: newLastVisible };
};
