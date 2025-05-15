# !/bin/bash

# Reset to HEAD~1
git reset --hard HEAD~1

# Pull the latest changes
git pull

# Delete README.md file
rm -f README.md

# Add all changes to git
git add .

# Commit the changes
git commit -m "Deploy to Vercel"

# Push the changes to the remote repository
git push 
