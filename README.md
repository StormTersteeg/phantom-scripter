# phantom-scripter
Your Universal Quick-Launch Companion

![app](https://github.com/user-attachments/assets/2aa742e9-9b7b-4d3e-ad5b-cddfb1c74fe7)

Phantom-Scripter is a lightweight scripting tool that lets you launch files or open websites based on your input, no matter where you type.

<hr>

### Features:
- **Universal Input Detection**: Launch files or open websites from anywhere.
- **Customizable Scripts**: Define your own shortcuts.
- **Theme Switcher**: Spice things up with pre-loaded themes! Simply tap the palette icon to switch.

<hr>

### Getting Started:
- Download Phantom-Scripter from the [releases page](https://github.com/StormTersteeg/phantom-scripter/releases).
- Run the app.
- Press the `+` button.
- Enter a command to trigger your script in the `Command` input.
- Select your action (`Start File`, `Open Link`, `Run command`, `GET request`, `POST request`, `PUT request`, `DELETE request`)
- Enter a path or value in the `Input` input (depending on your `action`).
- Scripts and other settings are automatically saved.
- Start using shortcuts to quickly open files, websites, or run scripts from anywhere.

<hr>

### Using Advanced Scripts (POST, PUT Requests)  

Phantom-Scripter also supports more advanced use cases like sending HTTP requests (POST, PUT, etc.) with custom payloads. You can define these in the editor or the script configuration.  

#### Example: Sending a POST Request  
If you want to send a `POST` request with JSON data, define a script like this:  

```yaml
scripts:
  script-1:
    command: '!new-status'
    input: https://api.example.com/new-status && {"status":"active"}
    type: POST request
```

Here’s how it works:  
- `command` is the trigger you type (`!lock`).  
- `input` is the API endpoint followed by `&&` and the JSON payload.  
- `type` is `Run command`, which tells Phantom-Scripter to execute it.  

#### Example: Sending a PUT Request  
If you need to send a `PUT` request, use a similar approach:  

```yaml
scripts:
  script-2:
    command: '!update-status'
    input: https://api.example.com/update-status && {"status":"active"}
    type: PUT request
```

### General Format for API Requests  
The syntax follows this pattern:  

```
<URL> && <JSON payload>
```

- `&&` separates the URL and the data.

### Additional Tips  
- Ensure the API you are calling allows CORS if needed.  
- If your API requires authentication, you may need to handle API keys separately.  
- For GET requests, simply use the URL without `&&`.  

<hr>  

Phantom-scripter was built using [Python Glide Framework](https://github.com/StormTersteeg/Python-Glide-Framework).
