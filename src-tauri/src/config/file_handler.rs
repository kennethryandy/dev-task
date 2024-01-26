use dirs::config_local_dir;
use std::{
    ffi::OsStr,
    fs,
    io::{Error, Read},
    path::PathBuf,
};

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

    // pub fn with_path(path: PathBuf) -> Self {
    //     Self { path }
    // }

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

    pub fn read_from_file(&self, filename: String) -> Result<String, Error> {
        let file_path = self.path.join(filename);
        let mut file = fs::File::open(file_path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        Ok(contents)
    }

    pub fn read_from_dir(&self, folder_name: &str) -> Result<Vec<String>, Error> {
        let mut contents = Vec::new();
        let dir_path = self.path.join(folder_name);
        for entry in fs::read_dir(dir_path)? {
            let entry = entry?;
            let file_path = entry.path();

            dbg!(&file_path.file_name());

            if file_path.is_file() && file_path.extension() == Some(OsStr::new("txt")) {
                let mut file = fs::File::open(file_path)?;
                let mut file_content = String::new();
                file.read_to_string(&mut file_content)?;
                contents.push(file_content);
            }
        }
        Ok(contents)
    }

    pub fn create_dir(&self, folder_name: &str) -> Result<(), Error> {
        fs::create_dir(self.path.join(folder_name))
    }
}

#[cfg(test)]
mod tests {
    use super::AppFileHandler;

    #[test]
    fn test_write_file() {
        let file_handler = AppFileHandler::new();
        let folder_name = Some("test folder");
        let file_name = String::from("test-file-no-ext");
        let content = "Some content 1".to_string();
        let write = file_handler.write_to_file(folder_name, file_name, &content);
        assert!(write.is_ok());

        let folder_name = Some("test folder");
        let file_name = String::from("test-file.txt");
        let content = "Some content 2".to_string();
        let write = file_handler.write_to_file(folder_name, file_name, &content);
        assert!(write.is_ok());

        let folder_name = Some("test folder");
        let file_name = String::from("test file.txt");
        let content = "Some content 3".to_string();
        let write = file_handler.write_to_file(folder_name, file_name, &content);
        assert!(write.is_ok());
    }

    #[test]
    fn test_read_file() {
        let file_handler = AppFileHandler::new();
        let folder_name = "test folder";
        let read_1 = file_handler.read_from_file(format!("{}/test-file-no-ext.txt", &folder_name));
        assert_eq!(read_1.unwrap(), "Some content 1");

        let read_2 = file_handler.read_from_file(format!("{}/test-file.txt", &folder_name));
        assert_eq!(read_2.unwrap(), "Some content 2");

        let read_3 = file_handler.read_from_file(format!("{}/test file.txt", &folder_name));
        assert_eq!(read_3.unwrap(), "Some content 3");
    }

    #[test]
    fn test_read_dir_files() {
        let file_handler = AppFileHandler::new();
    }

    #[test]
    fn test_create_dir() {
        let file_handler = AppFileHandler::new();
        let cd = file_handler.create_dir("test");
        assert!(cd.is_ok());
    }
}
