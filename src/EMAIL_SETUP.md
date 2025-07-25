# Connect Hub: Production DNS Configuration Guide
This document contains the definitive DNS records required to run the `spiritual-connect.com` website on **Firebase Hosting** and handle email through **Zoho Mail**.

**Action Required:** Log into your Jamii Host DNS management panel and update your records to match this configuration precisely. This will resolve the SSL errors and take your site live.

---

## **Part 1: Firebase Hosting Records (Website)**
These records point your domain to the Firebase servers, making your website live.

### **ACTION: REMOVE Old Hosting Records**
First, **DELETE** the following `A` and `AAAA` records that point to your old host. They are conflicting with Firebase.

| Type | Host / Name             | Value                  | ACTION      |
|:-----|:------------------------|:-----------------------|:------------|
| A    | ftp                     | 185.109.170.140        | **DELETE**  |
| A    | mail                    | 185.109.170.140        | **DELETE**  |
| A    | pop                     | 185.109.170.140        | **DELETE**  |
| A    | smtp                    | 185.109.170.140        | **DELETE**  |
| A    | `spiritual-connect.com` | 185.109.170.140        | **DELETE**  |
| A    | webmail                 | 185.109.170.140        | **DELETE**  |
| A    | www                     | 185.109.170.140        | **DELETE**  |
| AAAA | (all records)           | 2a01:a500:3404:0:0:0:0:3| **DELETE ALL** |

### **ACTION: ADD Firebase Records**
Now, **ADD** these two `A` records. These are the standard IP addresses for Firebase Hosting.

| Type | Host / Name             | Value         | ACTION |
|:-----|:------------------------|:--------------|:-------|
| A    | `spiritual-connect.com` | `199.36.158.100`| **ADD / KEEP** |
| A    | www                     | `199.36.158.100`| **ADD**    |

*Note: Firebase sometimes provides two different IP addresses. If they gave you two, add both as separate `A` records for `spiritual-connect.com` and `www`.*

---

## **Part 2: Zoho Mail Records (Email)**
These records tell the internet where to deliver your email. Your current Zoho setup is mostly correct.

### **ACTION: KEEP Correct Zoho Records**
These records are configured correctly. **DO NOT CHANGE THEM.**

| Type | Host / Name       | Value                       | Priority |
|:-----|:------------------|:----------------------------|:---------|
| MX   | @ or `spiritual-connect.com` | mx.zoho.eu                  | 10       |
| MX   | @ or `spiritual-connect.com` | mx2.zoho.eu                 | 20       |
| MX   | @ or `spiritual-connect.com` | mx3.zoho.eu                 | 50       |
| TXT  | `zmail._domainkey`| `v=DKIM1; k=rsa; p=...` (Your long DKIM key) | N/A      |

### **ACTION: CLEAN UP SPF Record**
You have multiple conflicting SPF records. **DELETE** all old SPF records and keep only this one, which correctly authorizes both Zoho and MailChannels (another service your host may use).

| Type | Host / Name | Value                                                                                           | ACTION      |
|:-----|:------------|:------------------------------------------------------------------------------------------------|:------------|
| TXT  | @           | `v=spf1 include:zohomail.eu include:relay.mailchannels.net ~all`                                  | **KEEP ONLY THIS ONE** |

---

## **Part 3: Nameserver Records (Do Not Touch)**
These records tell the internet that Jamii Host is in charge of your DNS settings. These should remain unchanged.

| Type | Host / Name             | Value                  |
|:-----|:------------------------|:-----------------------|
| NS   | `spiritual-connect.com` | `ns1.jamiihost.co.tz.` |
| NS   | `spiritual-connect.com` | `ns2.jamiihost.co.tz.` |

---
After you have made these changes, it may take anywhere from a few minutes to a few hours for them to take effect across the internet. Once they do, the Firebase verification will pass, your SSL certificate will be issued, and `https://spiritual-connect.com` will be live.
