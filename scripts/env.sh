################################################################################
#
# The environment script for all other functions
#
# @author Jack <jack@thinkingcloud.info>
# @version 0.0.1
# @date Wed Feb  7 10:49:52 2018
#
################################################################################


SOURCE="${BASH_SOURCE[0]}"
SCRIPT_DIR=$( cd "$( dirname "${SOURCE}" )" && pwd )
BASE_DIR=`dirname ${SCRIPT_DIR}`
NODE=`which node`
RUN_NODE_PATH="${BASE_DIR}:${BASE_DIR}/node_modules"
