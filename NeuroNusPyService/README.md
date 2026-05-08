# Neuronous_Services

Neuronous is a comprehensive service platform offering multiple security solutions. It includes a powerful password manager with options for both stateful and stateless password functionalities. Users can securely store passwords in an encrypted database or generate them without server retention. Additionally, Neuronous provides advanced RSA services for encrypting messages, ensuring secure communication. Whether it's password management or encryption, Neuronous delivers flexible, secure solutions tailored to modern needs.

## Identity Provider (JWT for all services)

This repo can act as a central **Identity Provider** for your ecosystem:

- Users **register** and **login** here.
- This service issues **JWT access + refresh tokens**.
- Other internal/external services validate tokens using the **public key** via JWKS (no shared secret).

### Endpoints (default host)

- `POST /api/auth/register/` (creates a user)
- `POST /api/auth/login/` (returns `access` + `refresh`)
- `POST /api/auth/token/refresh/` (body-based refresh, SimpleJWT compatible)
- `POST /api/auth/token/verify/`
- `GET /api/.well-known/jwks.json` (JWKS for other services)
- `GET /api/auth/public-key.pem` (raw PEM public key)

### Dedicated UserAuth app + domain (django-hosts)

This repo now includes a dedicated Django app: `userauth`.

- It has its own Swagger at `/{swagger|redoc}` on the **UserAuth host**.
- `main/hosts.py` routes `ACTIVE_HOSTS['UserAuth']` to `userauth.urls`.

Local example:

- Set `HOST_CONFIG['LOCAL']['UserAuth']="auth"` (already done)
- Add `127.0.0.1 auth` to your `/etc/hosts`
- Open `http://auth:8000/swagger/`

### RSA keys (RS256)

Generate a keypair:

```
python manage.py generate_jwt_keypair --private-out ./jwt_private.pem --public-out ./jwt_public.pem
```

Configure via `.env` (preferred file-based config):

- `JWT_PRIVATE_KEY_PATH=./jwt_private.pem`
- `JWT_PUBLIC_KEY_PATH=./jwt_public.pem`

Or inline PEM:

- `JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"`
- `JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"`

**clone project using HTTPS or SSH**

**_HTTPS:_**

```
git clone https://github.com/abdullahzulfiqar653/NeuronusPyServices.git
```

**_SSH:_**

```
git clone git@github.com:abdullahzulfiqar653/NeuronusPyServices.git
```

**Make and activate environment for project using commands given**

**1: making environment and installing dependencies**
**_Install python 3.11.7 on local machine https://www.python.org/_**

**i: installing poetry:**

**_windows:_**

```
pip install poetry
```

**_macOS/Linux:_**

```
pip3 install poetry
```

**ii: installing package:\_**
open terminal in NeuronusPyServices and run to make venv and to install packages in that
**_macOS/Linux/Windows:_**

```
poetry install
```

**ii: activating environment:\_**
after installation complete execute the following command
**_macOS/Linux/Windows:_**

```
poetry shell
```

**3: Setup .env to load environment variables**

add .env file in main source directory at the same level with manage.py and .env.example and setup all variables using the help of .env.example

**5: Run the Application and API in terminal or in vscode termnal**
Make sure to activate the virtual environment and you are in NeuronusPyServices directory
_​use command to run django-server:_

```
python manage.py runserver
```
