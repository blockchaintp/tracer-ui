#!/bin/bash

COMMAND="$1"
SUBCOMMAND="$2"

export DEV_IMAGE=dev/tracer-ui
export PROD_IMAGE=catenasys/tracer-ui
export PROD_CONTAINER=tracer-ui
export MOCK_API_IMAGE=mock/api

export ISOLATION_ID="dev"

function devmock(){
    if [ ! -z ${ISOLATION_ID} ]; then
        docker-compose -f ./docker-compose-build.yaml build dev
        docker-compose -f ./scenario/mock-local.yaml up
    else
        echo "Set ISOLATION_ID"
        exit 1
    fi
}

function devclean(){
    if [ ! -z ${ISOLATION_ID} ]; then
        docker rm -f $(docker ps -aq)
        docker rmi -f $(docker images --filter "dangling=true" -q)
        docker rmi -f ${DEV_IMAGE}:${ISOLATION_ID}
        docker rmi -f ${MOCK_API_IMAGE}
    else
        echo "Set ISOLATION_ID"
        exit 1
    fi
}

function dev(){
    local subcommand="$1"
    case $subcommand in
        "mock")
            devmock
            ;;
        "clean")
            devclean
            ;;
        *)
            echo "$COMMAND [mock | clean]"
            ;;
    esac
}

function prodbuild(){
    if [ ! -z ${ISOLATION_ID} ]; then
        docker-compose -f ./docker-compose-build.yaml build prod
    else
        echo "Set ISOLATION_ID"
        exit 1
    fi
}

function prodmock(){
    docker-compose -f ./scenario/daml-local.yaml up
}

function prodclean(){
    docker rmi -f $(docker images --filter "dangling=true" -q)
    docker rmi -f ${PROD_IMAGE}:${ISOLATION_ID}
}

function prod(){
    local subcommand="$1"
    case $subcommand in
        "build")
            prodbuild
            ;;
        "mock")
            prodmock
            ;;
        "clean")
            prodclean
            ;;
        *)
            echo "$COMMAND [build | mock | clean]"
            ;;
    esac
}

case $COMMAND in
   "dev")
        dev $SUBCOMMAND
        ;;
    "prod")
        prod $SUBCOMMAND
        ;;
    "clean")
        devclean
        prodclean
        ;;
    *)
        echo "$0 dev [mock|clean] | prod [build|clean] | clean"
        ;;
esac