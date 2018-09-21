import os
import os.path
import errno
from pymongo import MongoClient 

def delete_contents_of_dir(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            os.remove(os.path.join(root, file))


def create_dir(folder_path, delete_content):
    if not os.path.exists(folder_path):
        try:
            os.makedirs(folder_path)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise
    if(delete_content):
        delete_contents_of_dir(folder_path)

def connect_to_mongo_db():
    try: 
        conn = MongoClient() 
        print "Connected to MongoDB successfully!!!" 
        return conn 
    except:   
        print "Could not connect to MongoDB"

def write_to_collection(conn, db_name, collection_name, data):
    dblist = conn.list_database_names()
    db = conn[db_name]
    if db_name in dblist:
        print "The database exists."
    # Access collection of the database 
    mycollection = db[collection_name]

    #Returns a list of your db's collections:
    print db.list_collection_names()

    # Returns a list of your system's databases:
    print conn.list_database_names()

    mycollection.insert(data)

    # To find() all the entries inside collection name 'testTable'
    cursor = mycollection.find() 
    for record in cursor: 
        print record   