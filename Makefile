
test:
	@node test/index.js

dev:
	NODE_ENV=development node index.js

.PHONY: test
