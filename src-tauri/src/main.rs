// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)]

use config::AppFileHandler;

mod config;
mod handler;

use handler::{create_folder, get_folders_with_notes, get_notes_by_folder};

fn main() {
    tauri::Builder::default()
        .manage(AppFileHandler::new())
        .invoke_handler(tauri::generate_handler![
            get_notes_by_folder,
            get_folders_with_notes,
            create_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
