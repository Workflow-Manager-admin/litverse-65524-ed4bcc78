#!/bin/bash
cd /home/kavia/workspace/code-generation/litverse-65524-ed4bcc78/litverse_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

