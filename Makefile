.PHONY: resume watch site dev clean

# The file name is also the download name on the website ("-en": the English résumé).
PDF := build/alireza-hanifi-resume-en.pdf

# Build the PDF résumé from content/profile.yaml.
resume:
	@mkdir -p build
	typst compile --root . resume/resume.typ $(PDF)

watch:
	@mkdir -p build
	typst watch --root . resume/resume.typ $(PDF)

# Build the website (includes the résumé PDF) into site/dist.
site: resume
	cp $(PDF) site/public/
	cd site && npm run build

# Local dev server with live reload on http://localhost:4321
dev: resume
	cp $(PDF) site/public/
	cd site && npm run dev

clean:
	rm -rf build site/dist site/.astro site/public/alireza-hanifi-resume-en.pdf
