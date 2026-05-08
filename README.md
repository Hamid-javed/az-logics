# AZ-Logics — Work Portfolio

**Company:** [AZ-Logics](https://www.linkedin.com/company/azlogicsdev/)
**Role:** Associate Software Engineer
**Duration:** 1.5 Years

---

## Overview

This directory contains projects I worked on during my tenure at AZ-Logics. The company built a suite of productivity and security-focused SaaS products under the **Neuronus** brand — covering secure communication, file sharing, drive storage, email, password management, and RSA encryption services.

> **Note:** Several repos are empty. I was removed from the organization before I could retain the source code. The folder structure is preserved for reference.

---

## Projects

### 1. NeuroNusPyService — Core Backend Platform
**Repo:** `NeuroNusPyService/` · **Code: Available**

Central backend powering the entire Neuronus ecosystem. Acts as an Identity Provider — handles auth, JWT issuance, JWKS, RSA encryption services, and password management (stateful DB-stored + stateless generated).

| | |
|---|---|
| **Stack** | Python 3.11, Django 4.2, Django REST Framework, PostgreSQL, Poetry |
| **Auth** | JWT (access + refresh), JWKS endpoint, public-key PEM endpoint |
| **Features** | Password manager, RSA message encryption, multi-host routing via `django-hosts`, Swagger/ReDoc docs |

---

### 2. GhostTransferPortal — Zero-Knowledge File & Message Sharing
**Repo:** `GhostTransferPortal/` · **Code: Available**

Privacy-first web app for ephemeral sharing of files and messages via unique URLs. All encryption/decryption happens in the browser — backend never sees plaintext.

| | |
|---|---|
| **Stack** | React 19, Vite, Tailwind CSS 4, Axios, React Router |
| **Security** | AES-GCM client-side encryption, zero-knowledge architecture |
| **Features** | Time-based expiry, view-count limits, password protection, IP whitelisting |

---

### 3. NeuroMailPortal — Email Client Portal
**Repo:** `NeuroMailPortal/` · **Code: Available**

Full-featured email management portal with rich text composition, PDF export, and PGP encryption support.

| | |
|---|---|
| **Stack** | React 18, Vite, Tailwind CSS, React Query, Formik, React Quill |
| **Features** | Rich email editor, PGP/OpenPGP integration, PDF export, file attachments |

---

### 4. NeuroMailWeb — Email Client (Web)
**Repo:** `NeuroMailWeb/` · **Code: Lost**

Web frontend for the Neuronus mail service.

---

### 5. NeuroDrivePortal — Cloud Drive Portal
**Repo:** `NeuroDrivePortal/` · **Code: Lost**

Admin/portal interface for Neuronus Drive — the company's cloud storage product.

---

### 6. NeuroDriveWeb — Cloud Drive (Web)
**Repo:** `NeuroDriveWeb/` · **Code: Lost**

User-facing web app for Neuronus Drive cloud storage.

---

### 7. NeuroRsaPortal — RSA Encryption Portal
**Repo:** `NeuroRsaPortal/` · **Code: Lost**

Portal for the RSA encryption service — message encryption/decryption UI backed by `NeuroNusPyService`.

---

### 8. NeuroNusComputing — Computing Services
**Repo:** `NeuroNusComputing/` · **Code: Lost**

Internal computing/infrastructure service layer for the Neuronus platform.

---

### 9. PasswordManagerPortal — Password Manager Portal
**Repo:** `PasswordManagerPortal/` · **Code: Lost**

Dedicated portal UI for the Neuronus password manager — both stateful (DB-stored, encrypted) and stateless (generated, never stored) modes.

---

### 10. neuronus-web-v2 — Neuronus Web v2
**Repo:** `neuronus-web-v2/` · **Code: Lost**

Second-generation web frontend for the Neuronus platform.

---

### 11. apps.wasooli.online — Wasooli Mobile App
**Repo:** `apps.wasooli.online/` · **Code: Available**

React Native mobile application for [wasooli.online](https://wasooli.online). Calendar-based scheduling, offline-first storage, and PDF support.

| | |
|---|---|
| **Stack** | React Native 0.82, Redux Toolkit, React Navigation (drawer + tabs), AsyncStorage, Luxon |
| **Platforms** | Android, iOS |
| **Features** | Calendar views, offline storage, PDF printing, drawer navigation |

---

## Tech Summary

| Domain | Technologies |
|--------|-------------|
| Backend | Python, Django, DRF, PostgreSQL, JWT/JWKS |
| Frontend | React, Vite, Tailwind CSS, React Query, Formik |
| Mobile | React Native, Redux Toolkit, React Navigation |
| Security | AES-GCM, RSA, OpenPGP, zero-knowledge architecture |
| Tooling | Poetry, Docker, Swagger/ReDoc |
