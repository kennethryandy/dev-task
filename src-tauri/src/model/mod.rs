use std::sync::Arc;
use surrealdb::{
    engine::local::{Db, Mem},
    Surreal,
};

use tauri::{async_runtime::Mutex, AppHandle, State};
use tauri::{App, Manager};

#[derive(Default)]
pub struct Database {
    pub db: Arc<Mutex<Option<Surreal<Db>>>>,
}

impl Database {
    pub fn init(app: &App) -> Result<(), String> {
        let app_handle = app.app_handle();
        tauri::async_runtime::spawn(async move {
            let db = Surreal::new::<Mem>(()).await.unwrap();
            db.use_ns("my_ns")
                .use_db("my_db")
                .await
                .map_err(|err| err.to_string())
                .unwrap();
            app_handle.manage(Database {
                db: Arc::new(Mutex::new(Some(db))),
            });
            dbg!("DB setup succesful");
        });
        Ok(())
    }
}

pub async fn get_db(state: tauri::State<'_, Database>) -> Surreal<Db> {
    let db = state.db.lock().await;
    // Check if it exists
    let db = match db.as_ref() {
        Some(db) => db,
        None => {
            panic!("Database not connected, please reconnect to the database");
        }
    };
    return db.clone();
}

#[allow(dead_code)]
#[tauri::command]
pub async fn connect(_app_handle: AppHandle, state: State<'_, Database>) -> Result<String, String> {
    if state.db.lock().await.is_some() {
        return Ok(String::from("Database already connected"));
    }

    let db = Surreal::new::<Mem>(())
        .await
        .map_err(|err| err.to_string())?;

    db.use_ns("my_ns")
        .use_db("my_db")
        .await
        .map_err(|err| err.to_string())?;
    // Set the database
    *state.db.lock().await = Some(db);
    Ok("Connected to the database".to_owned())
}
