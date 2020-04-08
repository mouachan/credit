package org.redhat.mongodb;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.bson.Document;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CompanyService {

    @Inject MongoClient mongoClient;

    public List<CompanyInfo> list(){
        List<CompanyInfo> list = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find().iterator();

        try {
            while (cursor.hasNext()) {
                Document document = cursor.next();
                CompanyInfo companyInfo = new CompanyInfo();
                companyInfo.setStatusRCS(document.getString("statusRCS"));
                companyInfo.setSiren(document.getString("siren"));
                companyInfo.setSiret(document.getString("siret"));
                companyInfo.setDenomination(document.getString("denomination"));
                companyInfo.setaddress(document.getString("address"));
                companyInfo.setTva(document.getString("tva"));
                companyInfo.setType(document.getString("type"));
                companyInfo.setUpdateDate(document.getDate("updateDate"));
                companyInfo.setImmatriculationDate(document.getDate("immatriculationDate"));
                list.add(companyInfo);
            }
        } finally {
            cursor.close();
        }
        return list;
    }

    public void add(CompanyInfo companyInfo){
        Document document = new Document()
                .append("statusRcs", companyInfo.getStatusRCS())
                .append("siren", companyInfo.getSiren())
                .append("siret", companyInfo.getSiret())
                .append("denomination", companyInfo.getDenomination())
                .append("address",companyInfo.getaddress())
                .append("type", companyInfo.getType())                
                .append("tva", companyInfo.getTva())
                .append("immatricualtionDate", companyInfo.getImmatriculationDate())
                .append("updateDate", companyInfo.getUpdateDate());
               
        getCollection().insertOne(document);
    }

    private MongoCollection getCollection(){
        return mongoClient.getDatabase("companies").getCollection("companyInfo");
    }
}