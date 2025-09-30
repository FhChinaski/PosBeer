#!/bin/bash
# push-posbeer.sh
# Script para subir cambios a GitHub usando token personal sin pegarlo manualmente

# CONFIGURA AQUÍ TU TOKEN Y USUARIO
GITHUB_USER="FhChinaski"
GITHUB_TOKEN="ghp_11AU23WZQ0rnE7kKkEzfZh_ZOVbVkYfcBgCQnewfRhZNy6AXlrGR0NLMST9NIJG4cPAWDL2OMOdugmGWGw"
REPO="PosBeer"
BRANCH="main"

# Cambiar remote a HTTPS con token
git remote set-url origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO}.git

# Agregar todos los cambios
git add .

# Commit con mensaje
read -p "Escribe el mensaje del commit: " COMMIT_MSG
git commit -m "$COMMIT_MSG"

# Hacer push al branch configurado
git push origin $BRANCH

# Restaurar remote HTTPS limpio para no exponer token en el config
git remote set-url origin https://github.com/${GITHUB_USER}/${REPO}.git

echo "✅ Push completo a $BRANCH. Token protegido."
