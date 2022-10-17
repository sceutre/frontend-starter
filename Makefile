
.DEFAULT: all
.PHONY: all, clean, run, dirs, fresh, web, webwatch

all: web

fresh: clean debug

dirs:
	@mkdir -p build/dev
	@printf "  \xE2\x9c\x93 $@\n"

clean:
	@rm -rf build
	@printf "  \xE2\x9c\x93 $@\n"

view: web
	@cd . && ./node_modules/.bin/http-server ./build -s -c-1 -p 2234 -o

web: dirs build/bundle.js build/bundle.css build/assets.info

webwatch: build/bundle.css build/assets.info
	@cd . && ./node_modules/.bin/tsc -w

build/bundle.js: $(shell find src -name *.ts* -type f)
	@cd . && ./node_modules/.bin/tsc
	@printf "  \xE2\x9c\x93 tsc\n"
	@cd . && ./node_modules/.bin/esbuild build/dev/main.js --bundle --log-level=warning --outfile=build/bundle.js
	@printf "  \xE2\x9c\x93 $@\n"

build/bundle.css: $(shell find src/css -name *.css -type f)
	@cd . && ./node_modules/.bin/cleancss src/css/all.css  --skip-rebase -o build/bundle.css
	@printf "  \xE2\x9c\x93 $@\n"

build/assets.info: $(shell find assets -type f)
	@cp -R assets/* build
	@touch build/assets.info
	@printf "  \xE2\x9c\x93 $@\n"
