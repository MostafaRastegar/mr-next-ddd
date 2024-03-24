#!/bin/bash
read -p "Enter the name of the new api rout: " api_rout_name
# Remove any trailing 's' character
rout_name=${api_rout_name%s}


scopes='infrastructure models presentations services'

for scope in $scopes
  do
    node ./cli-scripts/"$scope".js $rout_name
  done


echo All done