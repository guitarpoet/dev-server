be:
	$(SILENT) ./scripts/run be
.PHONY: be

dbe:
	$(SILENT) ./scripts/run dbe
.PHONY: dbe

entries:
	$(SILENT) ./scripts/run entries -f be
.PHONY: entries
