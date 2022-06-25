#!/usr/bin/env bash

# This fetches the AWS CLI
# inflates it
# and sets location to the path
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# set the credentials to the default AWS CLI configuration file
mkdir ~/.aws # just in case the CLI did not create the file yet
AWS_CRED_FILE=~/.aws/credentials # just in case the CLI did not create the file yet
# make sure to pass the access and secret keys via the CI tool!
echo "[default]" > $AWS_CRED_FILE
echo -e "aws_access_key_id=$ACCESS_KEY" >> $AWS_CRED_FILE
echo -e "aws_secret_access_key=$SECRET_KEY" >> $AWS_CRED_FILE

# the $CIRCLE_BUILD_NUM variable is provided by CircleCI via the ENV's
# the idea here is to get a incremental version number
# the zip's name can be anything you like
zip -r app_v_$CIRCLE_BUILD_NUM.zip .ebextensions/ Dockerrun.aws.json