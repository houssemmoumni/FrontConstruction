import { Component, Inject, OnInit } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogModule, 
  MatDialogContent, 
  MatDialogActions, 
  MatDialogClose 
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-task-comments-dialog',
  templateUrl: './task-comments-dialog.component.html',
  styleUrls: ['./task-comments-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    DatePipe
  ],
})
export class TaskCommentsDialogComponent implements OnInit {
  comments: any[] = [];
  newComment: string = '';
  currentUser: any; // You should get this from your auth service

  constructor(
    public dialogRef: MatDialogRef<TaskCommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadComments();
    // Initialize current user (you might get this from a service)
    this.currentUser = {
      id: 'user123',
      name: 'Current User',
      role: 'projectManager' // or 'worker'
    };
  }

  loadComments(): void {
    this.commentService.getCommentsForTask(this.data.task.id).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const newComment = {
        taskId: this.data.task.id,
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        userRole: this.currentUser.role,
        text: this.newComment,
        timestamp: new Date().toISOString()
      };

      this.commentService.addComment(newComment).subscribe(
        (response) => {
          this.comments.push(response);
          this.newComment = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}