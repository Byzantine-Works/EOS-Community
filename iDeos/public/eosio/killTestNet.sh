# for demo purposes mostly
# find and kill nodeos process
# modified version of https://stackoverflow.com/questions/3510673/find-and-kill-a-process-in-one-line-using-bash-and-regex
#
kill $(ps -e | grep nodeos | awk '{print $1}')