use dirs::config_local_dir;
use rand::{thread_rng, Rng};
use std::{
    ffi::OsStr,
    fs,
    io::{Error, ErrorKind, Read},
    path::PathBuf,
};

use crate::handler::{BaseFile, Folder, Note};

pub struct AppFileHandler {
    path: PathBuf,
}

impl AppFileHandler {
    pub fn new() -> Self {
        let path = config_local_dir()
            .expect("Failed to get the config directory")
            .join("dev-task")
            .join("notes");
        Self { path }
    }

    pub fn with_path(path: PathBuf) -> Self {
        Self { path }
    }

    fn ensure_dir_exists(&self, folder_name: Option<&str>) {
        if folder_name.is_none() {
            fs::create_dir_all(&self.path).expect("Error creating directory");
        } else {
            fs::create_dir_all(&self.path.join(folder_name.unwrap().to_string()))
                .expect("Error creating directory");
        }
    }

    pub fn write_to_file<'a>(
        &self,
        folder_name: Option<&str>,
        mut filename: String,
        content: &str,
    ) -> Result<(), Error> {
        self.ensure_dir_exists(folder_name);
        let file_path;

        if !filename.ends_with(".txt") {
            filename = filename + ".txt";
        }

        if folder_name.is_some() {
            file_path = self.path.join(folder_name.unwrap()).join(filename);
        } else {
            file_path = self.path.join(filename);
        }
        fs::write(file_path, content)?;
        Ok(())
    }

    pub fn read_from_file(&self, folder_name: &str, filename: String) -> Result<String, Error> {
        let file_path = self.path.join(folder_name).join(filename);
        let mut file = fs::File::open(file_path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        Ok(contents)
    }

    pub fn get_folders(&self) -> Result<Vec<Folder>, Error> {
        let mut folders: Vec<Folder> = Vec::new();

        for entry in fs::read_dir(&self.path).unwrap() {
            let entry_path = entry.unwrap().path();
            if entry_path.is_dir() {
                let folder_name = entry_path.file_name().unwrap().to_str().unwrap();
                if let Some(file_info) = BaseFile::from_path(&entry_path) {
                    let folder = Folder {
                        folder_name: folder_name.to_owned(),
                        notes: self.get_notes(&folder_name.to_string()).unwrap(),
                        file_info,
                    };
                    folders.push(folder);
                } else {
                    println!("Error retrieving file metadata.");
                }
            }
        }
        Ok(folders)
    }

    pub fn get_notes(&self, folder_name: &str) -> Result<Vec<Note>, Error> {
        let mut contents = Vec::new();
        let dir_path = self.path.join(folder_name);
        for entry in fs::read_dir(dir_path)? {
            let entry = entry?;
            let file_path = entry.path();
            let ext = &file_path.extension();

            if file_path.is_file() && file_path.extension() == Some(OsStr::new("txt")) {
                if let Some(file_info) = BaseFile::from_path(&file_path) {
                    // let mut file = fs::File::open(&file_path)?;
                    let name = file_path
                        .file_stem()
                        .unwrap()
                        .to_str()
                        .unwrap()
                        .split(".")
                        .nth(0)
                        .unwrap();
                    let intermediate_ext = file_path
                        .file_name()
                        .unwrap()
                        .to_str()
                        .unwrap()
                        .split(".")
                        .nth(1)
                        .unwrap();

                    contents.push(Note::new(
                        folder_name,
                        name,
                        ext.unwrap().to_str().unwrap(),
                        intermediate_ext,
                        None,
                        file_info,
                    ));
                }
            }
        }
        Ok(contents)
    }

    pub fn create_note(
        &self,
        folder_name: &str,
        mut filename: String,
        content: &str,
    ) -> Result<Note, Error> {
        self.ensure_dir_exists(Some(&folder_name));
        let mut rng = thread_rng();
        let intermediate_ext: String = rng
            .sample_iter(&rand::distributions::Alphanumeric)
            .take(5)
            .map(char::from)
            .collect::<String>()
            .to_lowercase();
        let path = &self
            .path
            .join(folder_name)
            .join(format!("{}.tmp-{}.{}", filename, intermediate_ext, "txt"));
        if let Some(file_info) = BaseFile::from_path(&path) {
            fs::write(path, &content)?;
            Ok(Note::new(
                folder_name,
                filename.as_str(),
                path.extension().unwrap().to_str().unwrap(),
                intermediate_ext.as_str(),
                Some(content.to_string()),
                file_info,
            ))
        } else {
            Err(Error::new(
                ErrorKind::Other,
                "Error retrieving file metadata.",
            ))
        }
    }

    pub fn create_dir(&self, folder_name: &str) -> Result<(), Error> {
        fs::create_dir(self.path.join(folder_name))
    }
}

#[cfg(test)]
mod tests {
    use super::AppFileHandler;

    #[test]
    fn test_write_file() {}

    #[test]
    fn test_read_file() {}

    #[test]
    fn test_get_notes() {}

    #[test]
    fn test_create_dir() {}
}
