#!/bin/sh
branch_name=`git rev-parse --abbrev-ref HEAD`

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_files() {
  git checkout -b $branch_name
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  branch_name=`git rev-parse --abbrev-ref HEAD`
  git remote add $branch_name https://${GH_TOKEN}@github.com/ottah/ArtifactDB.git > /dev/null 2>&1
  git push --quiet --set-upstream $branch_name 
}


setup_git
commit_files
upload_files