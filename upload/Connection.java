public void getData(con) {
    
    Statement s = null;
    ResultSet rs = null;

    try {
        s = con.createStatement();
        rs = s.executeQuery("SELECT * FROM MY_TABLE;");

        // Some long process that takes a while....
        // But this time we don't care that this will take time,  
        // since nobody is waiting for us to release the connection


    catch(Exception e) {
        throw new Exception(e.getMessage())
    } finally {
        s.close();
        rs.close();
    }
}