# App Settings ====================================================================================================
app_name = "Phantom Scripter"           # App name, displayed in the title bar
app_proportions = [500, 500]            # Width, Height
app_resizable = True                    # Allow the window to be resized
app_confirm_close = False               # Quit confirmation dialog prompt
app_allow_inspect = False               # To open up debugging console, right click on an element and select Inspect.
app_frameless = True                    # Create a frameless window. The window can be moved around by using the ".pywebview-drag-region" css class
app_fullscreen = False                  # Create a fullscreen window.
app_web_engine = "edgechromium"         # https://pywebview.flowrl.com/guide/renderer.html
app_on_top = True                       # Keep the window on top of all other windows

# Builder Settings ================================================================================================
debug = True                            # Show compilation errors
preview = True                          # Open preview app after compiling
export_html = True                      # Export compiled html into bin/app.html

file_name = "app.pyw"                   # Name of the exported pywebview script
resources = [                           # Resources to be included
  "resources/assets/roboto/roboto.min.css",
  "resources/assets/material-icons/material-icons.min.css",
  "resources/assets/material-4.1.1/material.min.css",
  "resources/assets/custom/custom.css",
  "resources/title-bar.html",
  "resources/index.html",
  "resources/assets/bootstrap-4.1.1/bootstrap.min.js",
  "resources/assets/material-4.1.1/material.min.js",
  "resources/assets/custom/custom.js"
]