# Connect Hub: Production DNS Configuration Guide
This document contains the definitive DNS records required to run the `spiritual-connect.com` website on **Firebase Hosting** and handle email through **Zoho Mail**.

**Action Required:** Log into your Jamii Host DNS management panel and update your records to match this configuration precisely. This will resolve the SSL errors and take your site live.

---

## **Part 1: Website Hosting Records (Firebase)**
These records point your domain to the Firebase servers, making your website live.

### **ACTION: DELETE ALL Old Hosting Records**
First, **DELETE** all of the following old `A`, `AAAA`, and `TXT` records that are causing conflicts.

| Type | Host / Name             | Value                                                          | ACTION                 |
|:-----|:------------------------|:---------------------------------------------------------------|:-----------------------|
| A    | (all records)           | `185.109.170.140`                                              | **DELETE ALL**         |
| AAAA | (all records)           | (any `AAAA` value)                                             | **DELETE ALL**         |
| TXT  | `spiritual-connect.com` | `"hosting-site=spiritual-connect-hub"`                         | **DELETE (Host Specific)** |
| TXT  | `spiritual-connect.com` | `"v=spf1 a mx ip4:185.109.170.140..."`                          | **DELETE (Old SPF)**       |
| TXT  | `x._domainkey`          | `"v=DKIM1; k=rsa; p=..."` (The key starting with `MIIBIjANBgk...`) | **DELETE (Old DKIM)**      |


### **ACTION: ADD/KEEP Correct Firebase Records**
Now, ensure these two `A` records are present and correct. These are the standard IP addresses for Firebase Hosting.

| Type | Host / Name             | Value         | ACTION         |
|:-----|:------------------------|:--------------|:---------------|
| A    | `spiritual-connect.com` | `199.36.158.100`| **ADD / KEEP** |
| A    | `www`                     | `199.36.158.100`| **ADD / KEEP** |

*Note: If Firebase provides a second IP address during setup, add it as another `A` record for both `spiritual-connect.com` and `www`.*

---

## **Part 2: Email Records (Zoho Mail)**
These records tell the internet to deliver your email to Zoho.

### **ACTION: ADD/KEEP Correct Zoho Records**
Make sure your email records look **exactly** like this. The "Value" must be only the Zoho server name, without your domain attached.

| Type | Host / Name       | Value                                                              | Priority | ACTION         |
|:-----|:------------------|:-------------------------------------------------------------------|:---------|:---------------|
| MX   | @                 | `mx.zoho.eu`                                                       | 10       | **ADD / KEEP** |
| MX   | @                 | `mx2.zoho.eu`                                                      | 20       | **ADD / KEEP** |
| MX   | @                 | `mx3.zoho.eu`                                                      | 50       | **ADD / KEEP** |
| TXT  | @                 | `v=spf1 include:zohomail.eu ~all`                                  | -        | **ADD / KEEP** |
| TXT  | `zmail._domainkey`| `v=DKIM1; k=rsa; p=...` (Your long DKIM key from Zoho)             | -        | **ADD / KEEP** |

---

## **Part 3: Final Critical Step**
In your Jamii Host DNS settings, you must find the setting for **Mail Routing** (or similar). Change it from "Local Mail Exchanger" to **"Remote Mail Exchanger"**. This tells your host "Do not handle my email; Zoho will handle it." This step is essential for your email to work.

---
After you have made these changes, it may take anywhere from a few minutes to a few hours for them to take effect across the internet. Once they do, the Firebase verification will pass, your SSL certificate will be issued, and `https://spiritual-connect.com` will be live.
