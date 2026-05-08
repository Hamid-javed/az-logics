# 👻 GhostTransfer

### Zero-Knowledge Secure File & Message Sharing Platform

> **GhostTransfer** is a privacy-first web application that allows users to **securely share files and messages via a unique URL**, with advanced access controls and **true end-to-end encryption**.
> Even the backend **cannot read your data** — ever.

---

## 📌 Overview

GhostTransfer enables **ephemeral, controlled, and encrypted data sharing**.
Users upload files and/or messages, apply strict security rules, and receive a **unique shareable link**.
Only the intended recipient—meeting all defined conditions—can access the data.

All encryption and decryption happens **in the browser**, ensuring a **zero-knowledge architecture**.

---

## 🎯 Use Cases

* Secure file & message sharing
* One-time or time-limited data transfer
* Privacy-critical communication
* Internal company file exchange
* Sharing sensitive credentials or documents

---

## ✨ Key Features

* 📎 Share files along with a message
* 🔗 Unique auto-generated access URL
* ⏳ **Time-based expiry** (1 day, 7 days, or unlimited)
* 👁 **Maximum view limit** (access count restriction)
* 🔑 **Password protection**
* 🌍 **IP whitelisting** (access allowed only from approved IPs)
* 🔐 **End-to-end encryption (AES-GCM)**
* 🧠 **Zero-knowledge backend**
* ⚡ Fast & modern web interface
* 🛡 Enterprise-grade security controls

---

## 🧠 How It Works (Zero-Knowledge Design)

1. User uploads a **file and/or message**
2. Browser generates a **symmetric encryption key**
3. Data is encrypted **client-side using AES-GCM**
4. Only **encrypted data** is sent to the backend
5. Backend stores encrypted payload **without the key**
6. A **unique URL + encryption key** is shared with the recipient
7. Recipient opens the URL
8. Encrypted data is fetched
9. Data is **decrypted in the browser**
10. Backend never sees plaintext data

🔒 **Admins, developers, and servers cannot access user data**

---

## 🔐 Security Controls

GhostTransfer allows combining multiple layers of security:

* ⏱ Expiration time enforcement
* 🔢 Maximum access count
* 🔑 Password validation
* 🌐 IP address whitelisting
* 🔐 AES-GCM authenticated encryption
* 🧠 Client-side key generation & decryption

All conditions must be satisfied before access is granted.

---

## 🏗️ Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Backend    | Django 4.2                  |
| Language   | Python 3.11.8               |
| Frontend   | React.js (LTS)              |
| Encryption | AES-GCM (Client-Side)       |
| Database   | PostgreSQL / SQLite         |
| Server     | NGINX + Gunicorn            |
| API        | REST                        |
| Security   | Zero-Knowledge Architecture |

---

## 🛡 Zero-Knowledge Guarantee

> GhostTransfer **never stores encryption keys**
> GhostTransfer **never decrypts data on the server**
> GhostTransfer **cannot read your files or messages**

Your privacy is mathematically enforced, not policy-based.

---

## 🚀 Highlights

* No trust required in the server
* Browser-only decryption
* Strong cryptography
* Fine-grained access control
* Modern, scalable architecture

---

## 🌐 Live Access

[https://ghosttransfer.tech/](https://ghosttransfer.tech/)

---

## 📄 License

GhostTransfer is **open-source software** and is available for use, modification, and distribution under an open-source license.

