server:
	$(SILENT) ./scripts/run main -c server -f be
.PHONY: server

be:
	$(SILENT) ./scripts/run be
.PHONY: be

dbe:
	$(SILENT) ./scripts/run dbe
.PHONY: dbe

entries:
	$(SILENT) ./scripts/run entries -f be
.PHONY: entries

test:
	$(SILENT) ./scripts/run main -c test -f be
.PHONY: test

fix_npm:
	$(SILENT) npm link hot-pepper-jelly
	$(SILENT) npm link @guitarpoet/configurator
.PHONY: fix_npm

pack:
	$(SILENT) ./scripts/run main -c pack -f fe
.PHONY: pack
