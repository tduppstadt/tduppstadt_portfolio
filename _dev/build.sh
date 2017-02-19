echo " "
echo "_______________ BLUE BUILD MENU _______________"
echo " "
echo "1.  Build Project"
echo "    - Compile Templates"
echo "    - Build JS"
echo ""
echo "2.  Compile Templates"
echo "    - from [devFolder]/src/templates"
echo "    - to window.oTemplates"
echo ""
echo "3.  Compress PNG Images"
echo "    - from [devFolder]/src/images/compression"
echo "    - to Content/images"
echo ""
echo "4.  Glue Sprites"
echo "    - from [devFolder]/src/images/sprites"
echo "    - image to Content/images/sprites"
echo "    - SCSS to [devFolder]/src/scss/sprites"
echo ""
echo "5.  Compile SCSS"
echo "    - from [devFolder]/src/scss"
echo "    - to Content/css"
echo ""
echo "6.  Watch SCSS"
echo "    - Listens and responds to updates from SCSS files."
echo "    - [Ctrl + Break] will stop the service."
echo ""
echo "0.  Cancel"
echo ""
echo "_______________"
echo ""

read -p "Option > " choice


if [ $choice -eq 0 ]; then
	exit 0
fi

echo ""
echo "Executing ..."
echo ""

if [ $choice -eq 1 ]; then
	grunt --pagename=project build;
	echo " "
	echo "__ BUILD COMPLETE __"
	echo " "
fi

if [ $choice -eq 2 ]; then
	grunt --pagename=project buildTemplate;
	echo " "
	echo "__ TEMPLATES COMPILED __"
	echo " "
fi

if [ $choice -eq 3 ]; then
	grunt --pagename=project compressImages;
	echo " "
	echo "__ IMAGE COMPRESSED __"
	echo " "
fi

if [ $choice -eq 4 ]; then
	grunt --pagename=project glueSprites;
	echo " "
	echo "__ GLUE SPRITES COMPLETE __"
	echo " "
fi

if [ $choice -eq 5 ]; then
	grunt --pagename=project compileScss;
	echo " "
	echo "__ SCSS COMPILED __"
	echo " "
fi

if [ $choice -eq 6 ]; then
	echo "Listening for SCSS changes ... "
	grunt --pagename=project watchScss;	
fi
