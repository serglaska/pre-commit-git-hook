There is the script, that we use for clean code. This script uses with configured ESLint.
You have to set next steps: 
  1. Go to .git/hooks. You would see a file named pre-commit.sample
  2. Rename that file to pre-commit, Remove the existing sample code.
  3. Paste this script:
   <br>
```zsh
        #!/bin/bash
        STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
        ESLINT="$(git rev-parse --show-toplevel)/node_modules/.bin/eslint"
        if [[ "$STAGED_FILES" = "" ]]; then
          exit 0
        fi
        PASS=true
        printf "\nValidating Javascript:\n"
        # Check for eslint
        if [[ ! -x "$ESLINT" ]]; then
          printf "\t\033[41mPlease install ESlint\033[0m (npm i --save-dev eslint)"
          exit 1
        fi
        for FILE in $STAGED_FILES
        do
          "$ESLINT" "$FILE" --max-warnings 0
          if [[ "$?" == 0 ]]; then
            printf "\t\033[32mESLint Passed: $FILE\033[0m"
          else
            printf "\t\033[41mESLint Failed: $FILE\033[0m"
            PASS=false
          fi
        done
        printf "\nJavascript validation completed!\n"
        if ! $PASS; then
          printf "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
          exit 1
        else
          printf "\033[42mCOMMIT SUCCEEDED\033[0m\n"
        fi
        exit $?
 ```
  4. Save file.
  5. Run `chmod +x .git/hooks/pre-commit` to make it an executable file.
  6. Voila!
