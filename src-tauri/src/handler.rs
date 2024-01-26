mod folder;
mod note;

// re-export
pub use folder::*;
pub use note::*;

use crate::config::AppFileHandler;

#[tauri::command]
pub fn new_folder(folder_name: &str, state: tauri::State<'_, AppFileHandler>) -> Folder {
    state.create_dir(folder_name).unwrap();
    Folder::init(folder_name, Vec::new())
}

#[tauri::command]
pub fn get_folders_with_notes(state: tauri::State<'_, AppFileHandler>) -> Vec<Folder> {
    state.get_folders().unwrap()
}

#[tauri::command]
pub fn get_notes_by_folder(folder_name: &str, state: tauri::State<'_, AppFileHandler>) -> Folder {
    let notes = state.get_notes(folder_name).unwrap();
    Folder::init(folder_name, notes)
}

#[tauri::command]
pub fn create_folder(
    folder_name: &str,
    state: tauri::State<'_, AppFileHandler>,
) -> Result<(), String> {
    state
        .create_dir(folder_name)
        .expect("Something went wrong while creating the folder");
    Ok(())
}

#[tauri::command]
pub fn create_note(folder_name: &str, content: &str, state: tauri::State<'_, AppFileHandler>) {}
