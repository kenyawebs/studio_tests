# Connect Hub: Production DNS Configuration Guide
This document contains the definitive DNS records required to run the `spiritual-connect.com` website on **Firebase Hosting** and handle email through **Zoho Mail**.

**Action Required:** Log into your Jamii Host DNS management panel and update your records to match this configuration precisely. This will resolve the SSL errors and take your site live.

---

## **Part 1: Firebase Hosting Records (Website)**
These records point your domain to the Firebase servers, making your website live.

### **ACTION: REMOVE Old Hosting Records**
First, **DELETE** all of the following `A` and `AAAA` records that point to your old host (`185.109.170.140`). They are conflicting with Firebase.

| Type | Host / Name             | Value                  | ACTION      |
|:-----|:------------------------|:-----------------------|:------------|
| A    | ftp                     | 185.109.170.140        | **DELETE**  |
| A    | mail                    | 185.109.170.140        | **DELETE**  |
| A    | pop                     | 185.109.170.140        | **DELETE**  |
| A    | smtp                    | 185.109.170.140        | **DELETE**  |
| A    | `spiritual-connect.com` | 185.109.170.140        | **DELETE**  |
| A    | webmail                 | 185.109.170.140        | **DELETE**  |
| A    | www                     | 185.109.170.140        | **DELETE**  |
| AAAA | (all records)           | (any value)            | **DELETE ALL** |

### **ACTION: ADD/KEEP Correct Firebase Records**
Now, ensure these two `A` records are present and correct. These are the standard IP addresses for Firebase Hosting.

| Type | Host / Name             | Value         | ACTION |
|:-----|:------------------------|:--------------|:-------|
| A    | `spiritual-connect.com` | `199.36.158.100`| **ADD / KEEP** |
| A    | www                     | `199.36.158.100`| **ADD / KEEP**    |

*Note: Firebase sometimes provides two different IP addresses. If they gave you two, add both as separate `A` records for `spiritual-connect.com` and `www`.*

---

## **Part 2: Zoho Mail Records (Email)**
These records tell the internet where to deliver your email. Your current Zoho setup is mostly correct, but needs cleanup.

### **ACTION: KEEP Correct Zoho MX Records**
Make sure your MX records look exactly like this. The "Host / Name" should be `@` or `spiritual-connect.com`, and the "Value" must be **only** the Zoho server name.

| Type | Host / Name       | Value                       | Priority |
|:-----|:------------------|:----------------------------|:---------|
| MX   | @ or `spiritual-connect.com` | mx.zoho.eu                  | 10       |
| MX   | @ or `spiritual-connect.com` | mx2.zoho.eu                 | 20       |
| MX   | @ or `spiritual-connect.com` | mx3.zoho.eu                 | 50       |

### **ACTION: CLEAN UP SPF & DKIM Records**
You have multiple conflicting text records. **DELETE** all old `SPF` and `DKIM` records and keep only these two:

| Type | Host / Name       | Value                                                              | ACTION                 |
|:-----|:------------------|:-------------------------------------------------------------------|:-----------------------|
| TXT  | @                 | `v=spf1 include:zohomail.eu include:relay.mailchannels.net ~all`   | **KEEP/ADD THIS SPF**  |
| TXT  | `zmail._domainkey`| `v=DKIM1; k=rsa; p=...` (Your long DKIM key from Zoho)             | **KEEP/ADD THIS DKIM** |

---

## **Part 3: Final Critical Step**
In your Jamii Host DNS settings, you must find the setting for **Mail Routing** (or similar). Change it from "Local Mail Exchanger" to **"Remote Mail Exchanger"**. This tells your host "Do not handle my email; Zoho will handle it." This step is essential for your email to work.

---
After you have made these changes, it may take anywhere from a few minutes to a few hours for them to take effect across the internet. Once they do, the Firebase verification will pass, your SSL certificate will be issued, and `https://spiritual-connect.com` will be live.