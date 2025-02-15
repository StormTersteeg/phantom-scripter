import webview, os, sys
import webbrowser
from pynput import keyboard
import yaml
import requests

last_50_keys_string = ""
settings = None  # keep it global so changes are instantly recognized

def on_press(key):
    global last_50_keys_string, settings
    try:
        last_50_keys_string += key.char
    except AttributeError:
        if key == keyboard.Key.space:
            last_50_keys_string += " "
        elif key == keyboard.Key.enter:
            last_50_keys_string += "\n"
        elif key == keyboard.Key.backspace:
            last_50_keys_string = last_50_keys_string[:-1]

    # cap at 50 chars
    if len(last_50_keys_string) > 50:
        last_50_keys_string = last_50_keys_string[1:]

    # check if the typed string ends with any script's command
    if settings and "scripts" in settings:
        for script_id, script_data in settings["scripts"].items():
            cmd = script_data.get("command", "")
            if cmd and last_50_keys_string.endswith(cmd):
                execute_script(script_data)
                last_50_keys_string = ""

def on_release(key):
    pass

def execute_script(script_data):
    """Executes the script based on its type and input."""
    script_type = script_data.get("type", "")
    script_input = script_data.get("input", "")
    if script_type == "Start file":
        try:
            os.startfile(script_input)
        except Exception as e:
            print(f"Could not start file: {e}")
    elif script_type == "Open link":
        try:
            webbrowser.open(script_input)
        except Exception as e:
            print(f"Could not open link: {e}")
    elif script_type == "Run command":
        try:
            os.system(script_input)
        except Exception as e:
            print(f"Could not run command: {e}")
    elif script_type == "GET request":
        try:
            requests.get(script_input)
        except Exception as e:
            print(f"Could not make GET request: {e}")
    elif script_type == "POST request":
        try:
            input_split = script_input.split(" && ")
            if len(input_split) == 1:
                url = input_split[0]
                print("no data")
                print(requests.post(url).text)
            elif len(input_split) == 2:
                url, data = input_split
                data = eval(data)
                print(data)
                print(requests.post(url, data=data).text)
        except Exception as e:
            print(f"Could not make POST request: {e}")
    elif script_type == "PUT request":
        try:
            input_split = script_input.split(" && ")
            if len(input_split) == 1:
                url = input_split[0]
                print("no data")
                print(requests.put(url).text)
            elif len(input_split) == 2:
                url, data = input_split
                data = eval(data)
                print(data)
                print(requests.put(url, data=data).text)
        except Exception as e:
            print(f"Could not make PUT request: {e}")
    elif script_type == "DELETE request":
        try:
            input_split = script_input.split(" && ")
            if len(input_split) == 1:
                url = input_split[0]
                print("no data")
                print(requests.delete(url).text)
            elif len(input_split) == 2:
                url, data = input_split
                data = eval(data)
                print(data)
                print(requests.delete(url, data=data).text)
        except Exception as e:
            print(f"Could not make DELETE request: {e}")

class Api:
    def close(self):
        window.destroy()
        os._exit(0)

    def minimize(self):
        window.minimize()

    def get_settings(self):
        global settings
        try:
            with open("settings.xml", "r") as f:
                settings = yaml.safe_load(f)
        except:
            with open("settings.xml", "w") as f:
                yaml.dump({'theme_index': 0, 'scripts': {}}, f)
            with open("settings.xml", "r") as f:
                settings = yaml.safe_load(f)

        if not settings.get('scripts'):
            settings['scripts'] = {}
        return settings

    def save_settings(self, new_settings):
        global settings
        settings = new_settings
        with open("settings.xml", "w") as f:
            yaml.dump(settings, f)

#!FLAG-HTML

if __name__ == '__main__':
    listener = keyboard.Listener(on_press=on_press, on_release=on_release)
    listener.start()

    api = Api()
    settings = api.get_settings()

    window = webview.create_window(
      "{settings.app_name}",
      html=html,
      js_api=api,
      width={settings.app_proportions[0]},
      height={settings.app_proportions[1]},
      confirm_close={settings.app_confirm_close},
      frameless={settings.app_frameless},
      fullscreen={settings.app_fullscreen},
      resizable={settings.app_resizable},
      on_top={settings.app_on_top}
    )

    webview.start(gui="{settings.app_web_engine}", debug={settings.app_allow_inspect})
