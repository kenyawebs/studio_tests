# Email Setup and DNS Configuration for spiritual-connect.com

This document contains the DNS records required to configure Zoho Mail for the `spiritual-connect.com` domain. These settings should be applied in the domain registrar's DNS management panel, not within this application's code.

---

## 1. User Accounts

The following email accounts have been provisioned:
- `admin@spiritual-connect.com`
- `dennis.m@spiritual-connect.com`

---

## 2. DNS Records for Zoho Mail

### MX Records (Mail Exchange)
These records tell the internet where to deliver email for your domain.

| Type | Host | Value | Priority |
|---|---|---|---|
| MX | @ | mx.zoho.eu | 10 |
| MX | @ | mx2.zoho.eu | 20 |
| MX | @ | mx3.zoho.eu | 50 |

### SPF Record (Sender Policy Framework)
This TXT record helps prevent email spoofing by specifying which servers are authorized to send email on behalf of your domain.

- **Type:** `TXT`
- **Host:** `@`
- **Value:** `v=spf1 include:zohomail.eu a mx ip4:185.109.170.140 include:relay.mailchannels.net ip6:2a01:a500:3404:0:0:0:0:3 ~all`

### DKIM Record (DomainKeys Identified Mail)
This adds a digital signature to outgoing emails, allowing receiving servers to verify that the email actually came from your domain.

- **Type:** `TXT`
- **Host:** `zmail._domainkey`
- **Value:** `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjvjXhlunoeurblFJpeDbZrePnZTQS9nJ5eo11bPVTb8E1/29hSDKOlZZWQsxD8J9lYoy+Do9aXim01VPvhqTPK3et6rJq/Xk2yVjdnYDGoMiChFAcuiHMCsigyg5TWePE0KJEyy8afPv+LG+0XBZf+ib+HbEJIysChCi+vTv1GQIDAQAB`

---

## 3. Firewall Whitelisting

If operating behind a corporate or restrictive firewall, ensure the following domains are whitelisted for both TCP and Web Socket protocols to allow full access to Zoho Mail services.

- `*.zoho.eu`
- `*.zohostatic.eu`
- `*.zohocdn.com`
- `*.sigmausercontent.com`
- `https://fonts.gstatic.eu`
- `https://fonts.zohowebstatic.eu`
- `wss://mailws.zoho.eu`
- `wss://mailwsorg.zoho.eu`
- `wss://mailwsfree.zoho.eu`

---

## 4. Other Provided DNS Information

The following records were also provided and should be verified in the DNS control panel. The `A` records point various subdomains to your primary IP address.

| Type | Host | Value |
|---|---|---|
| AAAA | ftp | 2a01:a500:3404:0:0:0:0:3 |
| AAAA | mail | 2a01:a500:3404:0:0:0:0:3 |
| A | ftp | 185.109.170.140 |
| A | mail | 185.109.170.140 |
| NS | spiritual-connect.com. | ns1.jamiihost.co.tz. |
| NS | spiritual-connect.com. | ns2.jamiihost.co.tz. |

**Note:** The presence of both Zoho MX records and other `A` records for `mail` implies a potential conflict. Ensure that the primary mail handling is correctly configured to use the MX records pointing to Zoho.
