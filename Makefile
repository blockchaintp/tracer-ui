MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
include $(MAKEFILE_DIR)/standard_defs.mk

PMD_IMAGE = blockchaintp/pmd:latest

build: $(MARKERS)/build_npm

test: $(MARKERS)/test_npm

analyze: analyze_sonar_js

package: $(MARKERS)/package_docker

clean: clean_container clean_npm

distclean: clean_docker

$(MARKERS)/package_docker:
	docker-compose -f docker-compose.yaml build dev
	docker-compose -f docker-compose.yaml build prod
	touch $@

.PHONY: clean_container
clean_container:
	docker-compose -f docker-compose.yaml rm -f || true

.PHONY: clean_docker
clean_docker:
	docker-compose -f docker-compose.yaml down -v --rmi all || true

.PHONY: clean_npm
clean_npm:
	rm -rf node_modules
