# Copyright 2019 Blockchain Technology Partners
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------

.PHONY: build
build:
	docker-compose build

.PHONY: dev
dev:
	docker-compose up -d

.PHONY: frontend.cli
frontend.cli:
	docker-compose exec frontend bash

.PHONY: frontend.run
frontend.run:
	docker-compose exec frontend yarn run develop

.PHONY: api.cli
api.cli:
	docker-compose exec api bash

.PHONY: api.run
api.run:
	docker-compose exec api yarn run serve
