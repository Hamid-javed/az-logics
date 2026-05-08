from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Syncs Django's migration state with columns that were manually added to the DB.
    
    Actual DB state before this migration:
      - files            TEXT  NOT NULL   (old field, now replaced by encrypted_files)
      - encrypted_files  TEXT  NOT NULL   (already exists in DB)
      - encrypted_message TEXT  NULL
      - encryption_salt  varchar(64) NULL
      - share_key        varchar(100) NOT NULL  (needs to become nullable)

    Strategy:
      - State ops: Add the new fields, remove old 'files' field from Django's ORM state
      - DB ops:
          1. Drop the old 'files' column (no longer needed)
          2. Alter 'share_key' to be nullable (so not every INSERT needs it)
          3. Skip adding encrypted_* and share_key columns (they already exist)
    """

    dependencies = [
        ('GhostTransfer', '0002_fileshare_message'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            # ── Django ORM state changes ──────────────────────────────────────
            state_operations=[
                migrations.AddField(
                    model_name='fileshare',
                    name='encrypted_files',
                    field=models.JSONField(default=list),
                ),
                migrations.AddField(
                    model_name='fileshare',
                    name='encrypted_message',
                    field=models.TextField(null=True, blank=True),
                ),
                migrations.AddField(
                    model_name='fileshare',
                    name='encryption_salt',
                    field=models.CharField(max_length=64, null=True, blank=True),
                ),
                migrations.AddField(
                    model_name='fileshare',
                    name='share_key',
                    field=models.CharField(max_length=100, null=True, blank=True),
                ),
                migrations.RemoveField(
                    model_name='fileshare',
                    name='files',
                ),
            ],
            # ── Actual DB operations ──────────────────────────────────────────
            database_operations=[
                # 1. Drop the old 'files' column (replaced by encrypted_files)
                migrations.RunSQL(
                    sql="ALTER TABLE GhostTransfer_fileshare DROP COLUMN files;",
                    reverse_sql=migrations.RunSQL.noop,
                ),
                # 2. Make share_key nullable so INSERTs don't require it
                migrations.RunSQL(
                    sql="""
                        CREATE TABLE GhostTransfer_fileshare_new AS
                            SELECT * FROM GhostTransfer_fileshare;

                        DROP TABLE GhostTransfer_fileshare;

                        CREATE TABLE "GhostTransfer_fileshare" (
                            "id" varchar(15) NOT NULL PRIMARY KEY,
                            "updated_at" datetime NOT NULL,
                            "created_at" datetime NOT NULL,
                            "encrypted_files" TEXT NOT NULL,
                            "views_used" integer unsigned NOT NULL,
                            "expires_at" datetime NULL,
                            "max_views" integer unsigned NULL,
                            "allowed_ip" char(39) NULL,
                            "password_hash" varchar(128) NULL,
                            "message" TEXT NULL,
                            "encrypted_message" TEXT NULL,
                            "encryption_salt" varchar(64) NULL,
                            "share_key" varchar(100) NULL
                        );

                        INSERT INTO "GhostTransfer_fileshare"
                            SELECT
                                id, updated_at, created_at, encrypted_files,
                                views_used, expires_at, max_views, allowed_ip,
                                password_hash, message, encrypted_message,
                                encryption_salt, share_key
                            FROM GhostTransfer_fileshare_new;

                        DROP TABLE GhostTransfer_fileshare_new;
                    """,
                    reverse_sql=migrations.RunSQL.noop,
                ),
            ],
        ),
    ]
