// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that creates and lists comment data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  static final String COMMENT_ID = "comment-input";
  static final String COMMENT_LIMIT = "comment-limit";
  static final String DATASTORE_COMMENT = "comment";
  static final String DATASTORE_MESSAGE = "Message";
  static final String DATASTORE_TIMESTAMP = "timestamp";
  static final String REDIRECT_LOCATION = "/comment.html";

  private List <String> comments;
  
  /** Responsible for creating new comments */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 
    Query query = new Query(DATASTORE_MESSAGE).addSort(DATASTORE_TIMESTAMP, SortDirection.DESCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    int num_entities = results.countEntities();
    int comment_limit = getCommentLimit(request, num_entities);

    comments = new ArrayList<>();
    for(Entity entity : results.asIterable(FetchOptions.Builder.withLimit(comment_limit))){
      String comment = (String) entity.getProperty(DATASTORE_COMMENT);
      comments.add(comment);
    }

    String json = convertToJsonUsingGson();
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
  
  /**Responsible for listing comments */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String comment = request.getParameter(COMMENT_ID);
    long timestamp = System.currentTimeMillis();

    //Create Entity
    Entity commentEntity = new Entity(DATASTORE_MESSAGE);
    commentEntity.setProperty(DATASTORE_COMMENT, comment);
    commentEntity.setProperty(DATASTORE_TIMESTAMP, timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    response.setContentType("text/html;");
    response.sendRedirect(REDIRECT_LOCATION);
  }


  /** Converts message of arrays into json fromat */
  private String convertToJsonUsingGson(){
    String json = new Gson().toJson(comments);
    return json;
  }

  /**Returns the number of comments the user wants to display, or -1 if number was invalid */
  private int getCommentLimit(HttpServletRequest request, int num_entities){
    String comment_limit_string = request.getParameter(COMMENT_LIMIT);
      
    //Convert the comment_limit to an int
    int comment_limit;
    try{
      comment_limit = Integer.parseInt(comment_limit_string);
      } catch(NumberFormatException e) {
          System.err.println("Could not convert to int: " + comment_limit_string);
          return num_entities;
      }

    if(comment_limit > num_entities ){
      return num_entities;
    }
    return comment_limit;
  }
} 

