// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use surrealdb::sql::Thing;

mod model;

#[derive(Debug, Serialize, Deserialize)]
struct Name {
    first: String,
    last: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Person {
    title: String,
    name: Name,
    marketing: bool,
}

#[derive(Debug, Serialize)]
struct Responsibility {
    marketing: bool,
}

#[derive(Debug, Deserialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn greet(name: &str, state: tauri::State<'_, model::Database>) -> surrealdb::Result<String> {
    let db = model::get_db(state).await;

    // db.create(resource)

    let created: Vec<Record> = db
        .create("person")
        .content(Person {
            title: "Founder & CEO".to_string(),
            name: Name {
                first: "Tobie".to_string(),
                last: "Morgan Hitchcock".to_string(),
            },
            marketing: true,
        })
        .await?;
    dbg!(created);

    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

#[tauri::command]
async fn get_all(state: tauri::State<'_, model::Database>) -> surrealdb::Result<()> {
    let db = model::get_db(state).await;

    let people: Vec<Person> = db.select("person").await?;
    dbg!(people);

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            model::Database::init(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_all])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
