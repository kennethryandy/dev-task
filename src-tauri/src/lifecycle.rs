use serde::Deserialize;
use tauri::{App, Manager};

use crate::{config::AppFileHandler, constants::EMIT_FOLDERS};

#[derive(Deserialize, Debug)]
struct ClientLoadPayload {
    ready: bool,
}

fn on_client_ready(app_handle: tauri::AppHandle) {
    app_handle.clone().listen_global("on-ready", move |event| {
        if let Some(payload) = event.payload() {
            let data: Result<ClientLoadPayload, _> = serde_json::from_str(payload);
            match data {
                Ok(data) => {
                    let folders = AppFileHandler::new().get_folders().unwrap();
                    app_handle.clone().emit_all(EMIT_FOLDERS, folders);
                }
                Err(e) => {
                    println!("Failed to deserialize payload: {:?}", e);
                }
            }
        }
    });
}

pub fn setup_app(app: &mut App) {
    let app_handle = app.app_handle();
    let fh = AppFileHandler::new();

    app_handle.manage(fh);
    on_client_ready(app_handle);

    #[cfg(debug_assertions)]
    {
        let window = app.get_window("main").unwrap();
        window.open_devtools();
        window.close_devtools();
    }
}
