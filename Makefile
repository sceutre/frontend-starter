
.DEFAULT: all
.PHONY: all, clean, run, dirs, fresh, web, webwatch

esbuild=./node_modules_dev/node_modules/.pnpm/node_modules/esbuild-windows-64/esbuild.exe
tsc=./node_modules_dev/node_modules/typescript/bin/tsc
httpserver=./node_modules_dev/node_modules/http-server/bin/http-server
cleancss=./node_modules_dev/node_modules/clean-css-cli/bin/cleancss

OUTDIR=build

all: web

fresh: clean web

dirs:
	@mkdir -p $(OUTDIR)/dev
	@printf "  \xE2\x9c\x93 $@\n"

clean:
	@rm -rf build
	@printf "  \xE2\x9c\x93 $@\n"

view: web
	@cd . && $(httpserver) ./build -s -c-1 -p 2234 -o

web: dirs $(OUTDIR)/bundle.js $(OUTDIR)/bundle.css $(OUTDIR)/assets.info

webwatch: $(OUTDIR)/bundle.css $(OUTDIR)/assets.info
	@cd . && $(tsc) -w

$(OUTDIR)/bundle.js: $(shell find src -name *.ts* -type f)
	@cd . && $(tsc)
	@printf "  \xE2\x9c\x93 tsc\n"
	@cd . && $(esbuild) $(OUTDIR)/dev/main.js --bundle --log-level=warning --outfile=$(OUTDIR)/bundle.js
	@printf "  \xE2\x9c\x93 $@\n"

$(OUTDIR)/bundle.css: $(shell find src/css -name *.css -type f)
	@cd . && $(cleancss) src/css/all.css  --skip-rebase -o $(OUTDIR)/bundle.css
	@printf "  \xE2\x9c\x93 $@\n"

$(OUTDIR)/assets.info: $(shell find assets -type f)
	@cp -R assets/* build
	@touch $(OUTDIR)/assets.info
	@printf "  \xE2\x9c\x93 $@\n"
