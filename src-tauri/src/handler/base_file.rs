use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf, time::SystemTime};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../src/types/")]
pub struct BaseFile {
    file_name: String,
    path: PathBuf,
    size: u64,
    #[ts(type = "..")]
    creation_time: SystemTime,
    #[ts(type = "..")]
    last_modification_time: SystemTime,
}

impl BaseFile {
    pub fn from_path(path: &PathBuf) -> Option<Self> {
        match fs::metadata(path) {
            Ok(metadata) => {
                let creation_time = metadata.created().ok()?;
                let last_modification_time = metadata.modified().ok()?;
                Some(Self {
                    file_name: path.file_name().unwrap().to_str().unwrap().to_string(),
                    path: path.clone(),
                    size: metadata.len(),
                    creation_time,
                    last_modification_time,
                })
            }
            Err(_) => None,
        }
    }
}
