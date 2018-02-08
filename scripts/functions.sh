################################################################################
#
# The functions script to run commands
#
# @author Jack <jack@thinkingcloud.info>
# @version 0.0.1
# @date Wed Feb  7 11:34:57 2018
#
################################################################################

SOURCE="${BASH_SOURCE[0]}"
SCRIPT_DIR=`dirname ${SOURCE}`

# Include the environments
. ${SCRIPT_DIR}/env.sh

output() {
    echo `date "+%Y-%m-%dT%H:%M:%S"` [INFO]: $*
}

error() {
    echo `date "+%Y-%m-%dT%H:%M:%S"` [ERROR]: $*
}

#
# This is the usage function
#
usage() {
    output hello
}

#
# Run the be project
#
run_be() {
    if [[ -z $1 ]]
    then
        # No be filters
        entry=`start_node ${BASE_DIR}/index.js -c entries -f be`
    else
        # We have a filter to run be
        entry=`start_node ${BASE_DIR}/index.js -c entries -f "be{$1}"`
    fi

    if [[ -z ${entry} ]]
    then
        if [[ -z $1 ]]
        then
            error "No be project at all!"
        else
            error "No be entry to run using your filter be{$1}"
        fi
    else
        start_node ${entry}
    fi
}

debug_be() {
    if [[ -z $1 ]]
    then
        # No be filters
        entry=`start_node ${BASE_DIR}/index.js -c entries -f be`
    else
        # We have a filter to run be
        entry=`start_node ${BASE_DIR}/index.js -c entries -f "be{$1}"`
    fi

    if [[ -z ${entry} ]]
    then
        if [[ -z $1 ]]
        then
            error "No be project at all!"
        else
            error "No be entry to run using your filter be{$1}"
        fi
    else
        debug_node ${entry}
    fi
}

start_node() {
    DEV_SERVER=1 NODE_PATH=${RUN_NODE_PATH} ${NODE} $*
}

debug_node() {
    DEV_SERVER=1 NODE_PATH=${RUN_NODE_PATH} ${NODE} inspect $*
}
