#!/bin/bash

CMD="npm run prepush"

#run the prepush command and check the result
$CMD
RESULT=$?
if [ $RESULT -ne 0 ]; then
	echo "failed $CMD"
	exit 1
fi

exit 0
