
package org.redhat.mongodb;

import io.quarkus.test.junit.QuarkusTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.redhat.mongodb.CompanyInfo;


import javax.inject.Inject;

import org.bson.Document;

@QuarkusTest
public class CompanyInfoTest {
    
    @Test
    public void testFindBySiren() {
        String siren = "829721605";
        System.out.println("test ");
        String expected = "CompanyInfo [Id=null, address=8 rue rosa parks 93400 Saint Ouen, denomination=Nanou SA, immatriculationDate=null, siren=829721605, siret=82972160500018, statusRcs=12, tva=FR829721605, type=SA, updateDate=Wed Apr 08 00:00:00 CEST 2020, note=null]"; 
        CompanyInfo companyInfo = new CompanyInfo();
        Document document = new Document()
        .append("siren", siren);  
      //  Assertions.assertEquals(expected, companyInfo.find(document).firstResult().toString());
    }

  /*  @Test void testUpdate(){
        CompanyInfo companyInfo = new CompanyInfo();
        System.out.println(companyInfo.findBySiren("829721605").toString());
        Notation note = new Notation();
        note.setVersion(1.0);
        note.setExecutionTime(10);
        note.setExecutionDate(new Date());
        note.setScore(12);
        note.setNote("A");
        // ArrayList<Variable> variables = new ArrayList<Variable>();
        // Variable variable = new Variable();
        // variable.setType("var");
        // variable.setValue("10");
        // variable.setScore(3);
        // variables.add(variable);
        // note.setVariables(variables);
        companyInfo.setNote(note);
        companyInfo.update();
        System.out.println(companyInfo.findBySiren("829721605").toString());

    }*/
}