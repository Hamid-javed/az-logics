# 🔐 NeuroPassword

### Zero-Knowledge Password Manager with Client-Side Cryptography

> **NeuroPassword** is a next-generation, privacy-first password manager that ensures **absolute user data ownership**.
> Neither developers nor administrators can access your passwords — **ever**.

🌐 Live Access:
[https://neuropassword.com/](https://neuropassword.com/)

---

## 📌 Overview

NeuroPassword is built on a **zero-knowledge security architecture**, where **all cryptographic operations happen inside the user’s browser**.
The backend only stores **encrypted blobs**, never plaintext, never usable keys.

Authentication, encryption, and password management are all performed without traditional usernames or passwords — instead using a **cryptographic seed-based login system**.

---

## 🧠 Core Philosophy

> **No seed = no access**
> **No keys on server**
> **No trust required**

Even with full database access, it is **cryptographically impossible** for developers, admins, or attackers to read user data.

---

## 🔑 Authentication System (Seed-Based Login)

1. A **16-digit random word seed** is generated **in the browser**
2. The seed is **never sent in raw form**
3. A cryptographic **hash is derived from the seed**
4. Due to entropy, collision is practically impossible
5. The hash is used to:

   * Identify the user
   * Derive a **symmetric encryption key**
6. Backend stores only **hashed identifiers and encrypted data**

🔐 No email, no password, no recovery backdoors.

---

## 🧠 Key Management Architecture

During initial setup:

* A **symmetric encryption key** is derived from the seed hash
* A **PGP keypair** is generated in the browser
* PGP **public & private keys** are:

  * Encrypted using the symmetric key
  * Stored encrypted in the backend
* Backend **never sees usable keys**

During login:

1. User re-enters their seed
2. Browser regenerates the same hash
3. Backend validates the hash
4. Encrypted keys are returned
5. Browser decrypts them using the regenerated symmetric key

---

## 🔐 Password Storage & Retrieval

### Storing Passwords

* Passwords are encrypted **in the browser**
* Encryption uses the user’s **PGP public key**
* Only encrypted data is sent to backend storage

### Viewing Passwords

* Encrypted data is fetched from backend
* Decryption happens using **PGP private key**
* Decryption occurs **locally in the browser**

🧠 Backend **never** has access to plaintext passwords.

---

## ✨ Key Features

* 🔑 Seed-based authentication (no traditional passwords)
* 🧠 Zero-knowledge architecture
* 🔐 PGP-based password encryption
* 🧾 Unlimited password storage
* 🌐 Browser-only encryption & decryption
* 🛡 Immune to insider attacks
* ⚡ Fast, modern UI
* 🧩 Scalable & secure design

---

## 🏗️ Tech Stack

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Backend        | Django 4.2                 |
| Language       | Python 3.11.8              |
| Frontend       | React.js (LTS)             |
| Cryptography   | PGP + Symmetric Encryption |
| Authentication | Seed-based Hash Derivation |
| Database       | PostgreSQL                 |
| Server         | NGINX + Gunicorn           |
| Architecture   | Zero-Knowledge             |

---

## 🛡 Security Guarantees

* Developers cannot access user data
* Admins cannot reset or view passwords
* Database leaks reveal only encrypted blobs
* No central master key
* All secrets remain client-side

**Security is enforced by cryptography, not trust.**

---

## 🚀 Why NeuroPassword?

* True end-to-end encryption
* No passwords to remember — only your seed
* No vendor lock-in
* No backdoors
* No compromise on privacy

---

## 📄 License

NeuroPassword is **open-source software** and is available for use, modification, and distribution under an open-source license.
