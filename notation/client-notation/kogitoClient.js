angular
  .module("demo", [])
  .controller("call-dmn", function ($scope, $http) {
    var baseUrl = ENV.baseUrl;
    $scope.notation = [ENV.baseUrl];
    var rentab_13;
    var strfin_36;
    var rentab_38;
    $scope.applicationResult = "";
    $scope.applicationResultIcon = "";
    $scope.displayResults = "display: none;";
    $scope.bilan = { gg: 10, ga: 20, hp: 30, hq: 40, fl: 50, fm: 6, hn: 3, gg1: 4, ga1: 16, hp1: 12, hq1: 3, fl1: 2, fm1: 1, fl2: 7, fm2: 5, ga2: 2, hn2: 34, dl: 5, ee: 5 };
    $scope.contrepartie = { siren: "1013B" };
    var data = '{"CodeNaf":"'+$scope.contrepartie.siren+'","Variables": [{ "valeur":'+ rentab_13 +',"type": "rentab_13"},{"valeur":'+strfin_36+',"type": "strfin_36"}],"rules":[]}}';
    $scope.startProcess = function () {
      console.log("Call DMN ! ");
      var startTime = new Date().getTime();
      var elapsedTime = 0;
      $scope.rules = [];
      $scope.notation = [];
      $scope.variables = [];

     console.log("base url : "+ baseUrl);
     console.log("data "+ data);

    var config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' } };

    $http.post( 
      baseUrl +
      '/calcul_variables',
      '{"bilan" : {"gg":' + $scope.bilan.gg + ',"ga":' + $scope.bilan.ga + ',"hp":' + $scope.bilan.hp + ',"hq":' + $scope.bilan.hq + ',"fl":' + $scope.bilan.fl + ',"fm":' + $scope.bilan.fm + ',"gg1":' + $scope.bilan.gg1 + ',"ga1":' + $scope.bilan.ga1 + ',"hp1":' + $scope.bilan.hp1 + ',"hq1":' + $scope.bilan.hq1 + ',"fl1":' + $scope.bilan.fl1 + ',"fm1":' + $scope.bilan.fm1 + ',"hn":' + $scope.bilan.hn + ',"ga2":' + $scope.bilan.ga2 + ',"hn2":' + $scope.bilan.hn2 + ',"fl2":' + $scope.bilan.fl2 + ',"fm2":' + $scope.bilan.fm2 + ',"dl":' + $scope.bilan.dl + ',"ee":' + $scope.bilan.ee + '}}'
      ,config).then(function (response) {
      console.log("response :" + response.status);
      $scope.greeting = response.data;
      console.log("score.greeting "+$scope.greeting);
      if ($scope.greeting.type == "SUCCESS") {
        // approved
        console.log("approved");
        // change label to approved
        $scope.displayResults = "";
        $scope.applicationResult = "Variables Calculées";
        $scope.applicationResultIcon = "pficon pficon-ok";
        // add comment to message
        rentab_13 = $scope.greeting.rentab_13;
        strfin_36 = $scope.greeting.strfin_36;
        rentab_38 = $scope.greeting.rentab_38;

       var rentab_13 = 9;
       var strfin_36 = 4;

      console.log(data);
      $http.post(
        baseURL+'/notation' ,
          data,
          config
      ).then(function (resp) {
        {
          "Variables": [
            {
              "valeur": 9,
              "type": "rentab_13"
            },
            {
              "valeur": 4,
              "type": "strfin_36"
            }
          ],
          "ContrePartie": {
            "DecoupageSectoriel": 1,
            "TypeAiguillage": "MODELE_1"
          },
          "ScoreFinal": 1.05,
          "Score": "function Score( CP, Var )",
          "rules": [],
          "Notation": {
            "Score": 1.05,
            "DecoupageSectoriel": 1,
            "Note": "C",
            "TypeAiguillage": "MODELE_1",
            "Orientation": "Defavorable"
          },
          "CodeNaf": "1013B"
        }
        $scope.res = resp.data;
        console.log($scope.res);
        elapsedTime = new Date().getTime() - startTime;
        var msgTime = "Temps d'execution : "+elapsedTime+" ms";
       /* var scores = $scope.res.result["dmn-evaluation-result"]["dmn-context"].ScoreFinal;
        var var_0 = {type:"",valeur:0,score:0};
        var var_1 = {type:"",valeur:0,score:0};
        var_0.type  = scores[0][1].type;
        var_0.valeur = scores[0][1].valeur;
        var_0.score = scores[0][0];
        var_1.type  = scores[1][1].type;
        var_1.valeur = scores[1][1].valeur;
        var_1.score = scores[1][0];*/
        //var msgContainer = "Version "+ENV.rules_version;
       // $scope.version = msgContainer;
        $scope.msgTime =elapsedTime;
        //$scope.variables = [var_0,var_1];
        var rules = $scope.res.rules;
        console.log(scores);
        var decision_notation = $scope.res.Notation;
        var typeAiguillage =  decision_notation.TypeAiguillage;
        var decoupageSectoriel = decision_notation.DecoupageSectoriel;
        console.log(typeAiguillage);
        if (typeAiguillage != "NON_NOTE") {
            // approved
            console.log("approved");
            // change label to approved
            $scope.displayResults = "";
            $scope.applicationResult = "Noté";
            $scope.applicationResultIcon = "pficon pficon-ok";
            var scoreFinal =  decision_notation.Score;
            var note =  decision_notation.Note;
            var orientation = decision_notation.Orientation;

            var msgType = "Modèle : "+typeAiguillage;
            var msgDecp = "Découpage : "+decoupageSectoriel;
            var msgScoreFinal = "Score : "+scoreFinal;
            var msgNote = "Note : "+note;
            var msgOrientation = "Orientation : "+orientation;
          

           // $scope.applicationResultMessages = [msgContainer,msgType,msgDecp,msgScoreFinal,msgNote,msgOrientation];
            $scope.notation = [msgType,msgScoreFinal,msgNote,msgOrientation];

            for (var i = 0; i < rules.length; i++) {
              $scope.rules.push(rules[i]);
             }
            console.log($scope.applicationResultMessages);
        } else {
            console.log("rejected");
            // rejected
            // change label to rejected
            $scope.displayResults = "";
            $scope.applicationResult = "Non Noté";
            $scope.applicationResultIcon = "pficon pficon-error-circle-o";
            // add comment to message
            $scope.version = msgContainer;
            $scope.notation = ["Non Elligibile à la notation"];
            $scope.rules.push(rules[0]);
            console.log($scope.applicationResultMessages);
        }


      });
    }
  });
}

})
