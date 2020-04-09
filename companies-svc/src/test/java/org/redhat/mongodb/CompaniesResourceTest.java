package org.redhat.mongodb;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class CompaniesResourceTest {

    @Test
    public void testFindBySiren() {
        String expected = "{\"address\":\"8 rue rosa parks 93400 Saint Ouen\",\"denomination\":\"NANOU\",\"siren\":\"829721605\",\"siret\":\"82972160500018\",\"tva\":\"FR829721605\",\"type\":\"SA\",\"updateDate\":\"2020-04-07T22:00:00Z[UTC]\"}"; 
        given()
          .when().get("/companies/search/829721605")
          .then()
             .statusCode(200);
           //   .body(is(expected));
    }

    @Test void testUpdate(){
        CompanyInfo companyInfo = new CompanyInfo();
        System.out.println(companyInfo.findBySiren("829721605").toString());

    }

}