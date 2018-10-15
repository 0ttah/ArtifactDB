#!/bin/sh

setup_git() {
  git config user.email "travis@travis-ci.org"
  git config user.name "Travis CI"
}

commit_files() {
  git checkout $TRAVIS_BRANCH
  git add cards-manifest.json
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER" -m "[skip ci]"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/ottah/ArtifactDB.git > /dev/null 2>&1
  git push --quiet --set-upstream origin 
}


setup_git
commit_files
upload_files