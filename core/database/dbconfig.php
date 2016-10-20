<?php
    class Database
    {   
        private $host = "messagenabottle.myds.me";
        private $db_name = "who_owes_who";
        private $username = "messagenabottle";
        private $password = "9bR-vVJ-x3k-7Vq";
        public $conn;
         
        public function dbConnection()
    	{
         
    	    $this->conn = null;    
            try
    		{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
    			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
            }
    		catch(PDOException $exception)
    		{
                echo "Connection error: " . $exception->getMessage();
            }
             
            return $this->conn;
        }

    }

?>