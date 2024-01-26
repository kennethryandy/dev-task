// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)]

mod config;
mod handler;

use config::AppFileHandler;

fn main() {
    let fh = AppFileHandler::new();
    let contents = fh.read_from_dir("test folder");
    dbg!(contents);
    tauri::Builder::default()
        .manage(AppFileHandler::new())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
