// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)]

use config::AppFileHandler;

mod config;
mod constants;
mod handler;
mod lifecycle;

use handler::{create_folder, get_folders_with_notes};
use lifecycle::setup_app;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            setup_app(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_folders_with_notes,
            create_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
